<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import Swal from 'sweetalert2'

import { loginSchema } from '@/schemas/auth.schema'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { loginWithPassw } = useAuth()

const loading = ref(false)
const form = ref({
  email: '',
  password: '',
})

const errors = ref({})

const submit = async () => {
  errors.value = {}
  loading.value = true

  const result = loginSchema.safeParse(form.value)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]
      errors.value[field] = issue.message
    })
    loading.value = false
    return
  }

  try {
    await loginWithPassw(form.value)
    router.push('/enviar')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesión',
      text: error.message,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen w-full bg-cover grid grid-cols-1 md:grid-cols-2"
    style="background-image: url('/img/hero-bg.jpg')"
    ;
  >
    <!-- Panel izquierdo -->
    <div
      class="hidden md:flex flex-col justify-center items-center px-12 text-white bg-linear-to-r from-primaryRed via-red-500 to-rose-400"
    >
      <h1 class="text-4xl font-bold mb-4">ValentinApp</h1>
      <p class="text-lg text-center max-w-sm opacity-90">
        Lo que nunca le has dicho, aquí encuentra voz.
      </p>
    </div>

    <!-- Panel derecho -->
    <div class="flex items-center justify-center px-6">
      <div
        class="w-full max-w-md p-8 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/30 animate-fade-in"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">
          Iniciar sesión
        </h2>

        <p class="text-gray-600 text-sm text-center mb-6">
          ¿No tienes cuenta?
          <RouterLink
            to="/register"
            class="text-primaryRed font-semibold hover:underline"
          >
            Regístrate
          </RouterLink>
        </p>

        <form @submit.prevent="submit" class="space-y-4">
          <!-- Email -->
          <div>
            <div class="relative">
              <i
                class="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-primaryRed"
              ></i>
              <input
                v-model="form.email"
                type="email"
                placeholder="correo@gmail.com"
                class="w-full pl-11 pr-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
              />
            </div>
            <small v-if="errors.email" class="text-red-500 text-xs">
              {{ errors.email }}
            </small>
          </div>

          <!-- Password -->
          <div>
            <div class="relative">
              <i
                class="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-primaryRed"
              ></i>
              <input
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="w-full pl-11 pr-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
              />
            </div>
            <small v-if="errors.password" class="text-red-500 text-xs">
              {{ errors.password }}
            </small>
          </div>

          <!-- Botón -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
