<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { registerSchema } from '@/schemas/auth.schema'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const { signUpWithPassw } = useAuth()
const router = useRouter()

const form = ref({
  email: '',
  password: '',
  passwordConfirm: '',
})

const errors = ref({})

const submit = async () => {
  errors.value = {}
  loading.value = true

  const result = registerSchema.safeParse(form.value)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]
      errors.value[field] = issue.message
    })
    loading.value = false
    return
  }

  try {
    await signUpWithPassw({
      email: form.value.email,
      password: form.value.password,
    })
    router.push('/completar-perfil')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al crear cuenta',
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
          Crear cuenta
        </h2>

        <p class="text-gray-600 text-sm text-center mb-6">
          ¿Ya tienes cuenta?
          <RouterLink
            to="/login"
            class="text-primaryRed font-semibold hover:underline"
          >
            Inicia sesión
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

          <!-- Confirm Password -->
          <div>
            <div class="relative">
              <i
                class="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-primaryRed"
              ></i>
              <input
                v-model="form.passwordConfirm"
                type="password"
                placeholder="••••••••"
                class="w-full pl-11 pr-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:ring-2 focus:ring-primaryRed focus:outline-none"
              />
            </div>
            <small v-if="errors.passwordConfirm" class="text-red-500 text-xs">
              {{ errors.passwordConfirm }}
            </small>
          </div>

          <!-- Botón -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>

          <!-- Info -->
          <p class="text-xs text-gray-600 text-center mt-4">
            <i class="bi bi-info-circle-fill text-primaryRed"></i>
            Tus datos serán eliminados al finalizar la actividad.
            <br />
            Att: <span class="font-semibold text-orange-500">Delta DCyT</span> y
            <span class="font-semibold text-indigo-600">CEDCYT</span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
