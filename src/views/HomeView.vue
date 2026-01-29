<script setup>
import ProfileComponent from "@/components/ProfileComponent.vue";
import Hero from "@/components/Hero.vue";
import Features from "@/components/Features.vue";
import Counter from "@/components/Counter.vue";
import Footer from "@/components/Footer.vue";
import { onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useUser } from "@/composables/useUser";

const { user } = useUser();

const { getSession } = useAuth();

onMounted(() => {
  getSession();
});
</script>

<template>
  <main>
    <ProfileComponent
      v-if="Object.keys(user).length"
      :user="user"
      class="mt-3"
    />

    <section v-else>
      <Hero />
      <Features />
      <Counter />
      <Footer />
    </section>
  </main>
</template>
