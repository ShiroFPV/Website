<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const submitted = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')

const socials = [
  {
    name: 'GitHub',
    handle: '@ShiroFPV',
    url: 'https://github.com/ShiroFPV',
    description: 'Check out my open-source projects and flight controller designs.',
    color: '#d7b7ff',
    icon: '🐙',
  },
  {
    name: 'Discord',
    handle: '@shiro1930',
    url: 'https://discord.gg/PaRHFSmX',
    description: 'Join the community and chat about FPV builds and hardware.',
    color: '#9bb4ff',
    icon: '💬',
  },
  {
    name: 'Email',
    handle: 'shirofpv@gmail.com',
    url: 'mailto:shirofpv@gmail.com',
    description: 'For collaborations, questions, or just to say hi.',
    color: '#ff8fd4',
    icon: '✉️',
  },
]

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''

  try {
    const payload = new URLSearchParams({
      'form-name': 'contact',
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    }).toString()

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload,
    })

    if (!response.ok) {
      throw new Error('Form submission failed')
    }

    submitted.value = true
    form.value = { name: '', email: '', message: '' }
  } catch {
    submitError.value = 'Could not send message right now. Please try again in a moment.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="pt-24 pb-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-8 sm:mb-12">
        <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm" style="color: #d7b7ff;">
          <span class="w-2 h-2 rounded-full" style="background: #ff8fd4;"></span>
          Get in Touch
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
          Hit Me <span class="gradient-text">Up</span>
        </h1>
        <p class="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          Whether you want to collaborate on hardware projects, talk FPV, or just say hi — I'm always down to chat.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 sm:gap-10">

        <div class="space-y-4">
          <h2 class="text-xl font-bold text-white mb-6">Find me online</h2>
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-card card-hover rounded-2xl p-5 flex items-start gap-4 block"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style="background: rgba(180,139,255,0.12);"
            >
              {{ social.icon }}
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-white">{{ social.name }}</span>
                <span class="text-sm font-medium" :style="`color: ${social.color}`">{{ social.handle }}</span>
              </div>
              <p class="text-gray-400 text-sm">{{ social.description }}</p>
            </div>
          </a>
        </div>

        <div>
          <h2 class="text-xl font-bold text-white mb-6">Send a message</h2>

          <Transition name="page" mode="out-in">
            <div v-if="submitted" class="glass-card rounded-2xl p-8 text-center">
              <div class="text-5xl mb-4">💜</div>
              <h3 class="text-xl font-bold text-white mb-2">Message received!</h3>
              <p class="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
              <button
                class="mt-6 btn-outline text-sm"
                @click="submitted = false"
              >
                Send another
              </button>
            </div>

            <form
              v-else
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              class="glass-card rounded-2xl p-6 space-y-4"
              @submit.prevent="handleSubmit"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p class="hidden">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </p>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5" for="name">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm transition-colors focus:outline-none focus:ring-2"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(180,139,255,0.3);"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5" for="email">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm transition-colors focus:outline-none focus:ring-2"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(180,139,255,0.3);"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5" for="message">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  required
                  rows="5"
                  placeholder="What's on your mind?"
                  class="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm transition-colors focus:outline-none focus:ring-2 resize-none"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(180,139,255,0.3);"
                ></textarea>
              </div>

              <p v-if="submitError" class="text-sm text-red-300">{{ submitError }}</p>

              <button :disabled="isSubmitting" type="submit" class="btn-primary text-white w-full text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Sending...' : 'Send Message ✉️' }}
              </button>
            </form>
          </Transition>
        </div>

      </div>
    </div>
  </div>
</template>
