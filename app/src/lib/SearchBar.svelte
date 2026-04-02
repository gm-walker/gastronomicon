<script>
import { Plus } from 'lucide-svelte';
</script>

<search>
  <form action="" method="get">
    <input type="search" name="ingredient-search" id="ingredient-search" placeholder="Add ingredient...">
    <button id="ingredient-submit" type="submit"><Plus size={36}/></button>
  </form>
</search>