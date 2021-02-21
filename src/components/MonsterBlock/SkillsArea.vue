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

<style lang="scss" scoped>
.skills-area {
  margin-top: 40px;

  .label {
    font-size: var(--large-font);
    font-weight: normal;
    margin-bottom: 10px;
  }

  .skills-list {
    display: flex;
    justify-content: space-between;

    .skills-list-item {
      width: 64px;
      height: 64px;
      background: #454545;
    }
  }
}
</style>
