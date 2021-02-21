<template>
  <nav class="nav">
    <div class="container">
      <ul class="nav-list">
        <router-link
          v-for="route in routes"
          :key="route.name"
          v-slot="{ href, navigate, isActive }"
          :to="route.path"
          custom
          exact
        >
          <li class="nav-list-item">
            <slot>
              <a
                class="nav-list-link"
                :class="isActive && 'active'"
                :href="href"
                @click="navigate"
              >
                {{ route.name }}
              </a>
            </slot>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import routes from '@/router/list';

export default {
  name: 'TheNav',
  computed: {
    routes: {
      get() {
        return routes;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  height: 40px;
  background: var(--darker-color);

  .nav-list {
    display: flex;
    align-items: center;

    .nav-list-item {

      .nav-list-link {
        display: inline-block;
        width: calc(500px / 3);
        text-align: center;
        color: var(--font-sub-color);
        line-height: 40px;
        text-decoration: none;

        &:hover {
          color: var(--font-main-color);
        }

        &.active {
          color: var(--font-main-color);
          border-radius: 10px 10px 0 0;
          background: var(--primary-color);
        }
      }
    }
  }
}
</style>
