<script lang='ts'>
  import { ingredients, pairings } from '$lib/stores';
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  let svgElement: SVGSVGElement;
  let width = 800;
  let height = 600;
  let simulation: any;

  onMount(() => {
    // Get container dimensions
    const container = svgElement.parentElement;
    if (container) {
      width = container.clientWidth || 800;
      height = container.clientHeight || 600;
    }

    // Create SVG selection
    const svg = d3.select(svgElement)
      .attr('width', width)
      .attr('height', height);

    // Unsubscribe function
    let unsubscribe: (() => void) | null = null;

    // Combined subscription to update graph when data changes
    unsubscribe = pairings.subscribe(($pairings) => {
      ingredients.subscribe(($ingredients) => {
        if ($pairings.length === 0) {
          return;
        }

        // Clear previous content
        svg.selectAll('*').remove();

        // Create a map of existing ingredient names
        const existingNames = new Set($ingredients.map(i => i.name));

        // Find all ingredient names referenced in pairings
        const referencedNames = new Set<string>();
        $pairings.forEach(p => {
          referencedNames.add(p.source);
          referencedNames.add(p.target);
        });

        // Create nodes for existing ingredients
        const nodes = $ingredients.map(d => ({ ...d, isPlaceholder: false }));

        // Create placeholder nodes for missing ingredients
        const missingNames = Array.from(referencedNames).filter(name => !existingNames.has(name));
        const placeholderNodes = missingNames.map(name => ({
          name,
          description: '',
          volume: '',
          weight: '',
          isPlaceholder: true
        }));

        // Combine all nodes
        const allNodes = [...nodes, ...placeholderNodes];

        // Create links, only for pairings where both ingredients exist (or are placeholders)
        const links = $pairings
          .filter(p => referencedNames.has(p.source) && referencedNames.has(p.target))
          .map(d => ({
            source: d.source,
            target: d.target
          }));

        // Create force simulation
        simulation = d3.forceSimulation(allNodes)
          .force('link', d3.forceLink(links)
            .id((d: any) => d.name)
            .distance(100)
            .strength(0.5)
          )
          .force('charge', d3.forceManyBody().strength(-300))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('collision', d3.forceCollide().radius(40));

        // Create container group for zoom/pan
        const g = svg.append('g')
          .attr('transform', `translate(${height/2})`);

        // Add zoom behavior
        const zoom = d3.zoom<SVGSVGElement, unknown>()
          .on('zoom', (event) => {
            g.attr('transform', event.transform);
          });
        (svg as any).call(zoom);

        // Create links
        const link = g.selectAll('line')
          .data(links, (d: any) => `${d.source}-${d.target}`)
          .enter()
          .append('line')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .attr('stroke-width', 2);

        // Create nodes
        const node = g.selectAll('circle')
          .data(allNodes, (d: any) => d.name)
          .enter()
          .append('circle')
          .attr('r', 30)
          .attr('fill', (d: any) => d.isPlaceholder ? '#fff' : '#4f46e5')
          .attr('stroke', (d: any) => d.isPlaceholder ? '#d1d5db' : '#818cf8')
          .attr('stroke-width', (d: any) => d.isPlaceholder ? 2 : 2)
          .attr('stroke-dasharray', (d: any) => d.isPlaceholder ? '5,5' : '0')
          .call((d3.drag() as any)
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
          )
          .on('mouseover', function() {
            d3.select(this)
              .attr('r', 40)
              .attr('fill', (d: any) => d.isPlaceholder ? '#fff' : '#6366f1');
          })
          .on('mouseout', function() {
            d3.select(this)
              .attr('r', 30)
              .attr('fill', (d: any) => d.isPlaceholder ? '#fff' : '#4f46e5');
          });

        // Add labels
        const labels = g.selectAll('text')
          .data(allNodes, (d: any) => d.name)
          .enter()
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '.3em')
          .attr('font-size', '12px')
          .attr('fill', (d: any) => d.isPlaceholder ? '#6b7280' : 'white')
          .attr('pointer-events', 'none')
          .text((d: any) => d.name);

        // Update positions on simulation tick
        simulation.on('tick', () => {
          link
            .attr('x1', (d: any) => {
              const source = d.source as any;
              return source.x;
            })
            .attr('y1', (d: any) => {
              const source = d.source as any;
              return source.y;
            })
            .attr('x2', (d: any) => {
              const target = d.target as any;
              return target.x;
            })
            .attr('y2', (d: any) => {
              const target = d.target as any;
              return target.y;
            });

          node
            .attr('cx', (d: any) => d.x)
            .attr('cy', (d: any) => d.y);

          labels
            .attr('x', (d: any) => d.x)
            .attr('y', (d: any) => d.y);
        });

        function dragstarted(event: any, d: any) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event: any, d: any) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event: any, d: any) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return () => {
          if (simulation) simulation.stop();
        };
      })();
    });

    return () => {
      if (unsubscribe) unsubscribe();
      if (simulation) simulation.stop();
    };
  });
</script>

<div class="flex h-screen w-full items-center justify-center">
  <svg id="graph" bind:this={svgElement}></svg>
</div>

<style>
  #graph {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
