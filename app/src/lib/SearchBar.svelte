<script>
import { Plus } from 'lucide-svelte';
</script>

<search>
  <form action="" method="get">
    <input type="search" name="ingredient-search" id="ingredient-search" placeholder="Add ingredient...">
    <button id="ingredient-submit" type="submit"><Plus color="#bbb" size={36}/></button>
  </form>
</search>

<style>
/* SearchBar element */
search form {
  padding: 1.5em;
  display: flex;
  gap: 5px;
  justify-content: center;
}

#ingredient-search {
  width: 30rem;
  padding: 1em;
  border: none;
  border-radius: 10rem;
  filter: var(--element-shadow)
  
}
#ingredient-search::placeholder { 
  color: #aaa;
}

#ingredient-submit {
  padding: 0.5em 0.7em;
  background-color: white;
  border-radius: 3em;
  filter: var(--element-shadow);
}
</style>