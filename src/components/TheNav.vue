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
