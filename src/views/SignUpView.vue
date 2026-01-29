<script setup>
import SignUpComponent from "../components/SignUpComponent.vue";
import { onMounted } from "vue";
import { useSupabase } from "@/clients/supabase";

const { supabase } = useSupabase();

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  }
}

onMounted(() => {
  signOut();
});
</script>

<template>
  <div>
    <SignUpComponent />
  </div>
</template>
