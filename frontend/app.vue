<template>
  <div>
    <pre>
      {{response}}
    </pre>
  </div>
</template>

<script setup>
  //import type { Restaurant } from '~/types'
  const { find } = useStrapi()
  const response = await find('tests')
  console.log(response)
</script>
