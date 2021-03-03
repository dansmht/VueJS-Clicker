<template>
  <div class="skills-area">
    <h3 class="label">
      Skills:
    </h3>
    <ul class="skills-list">
      <li
        v-for="i in 4"
        :key="i"
        class="skills-list-item"
      />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SkillsArea',
};
</script>
