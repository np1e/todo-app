<script>
import DefaultLayout from "../layout/LayoutDefault.vue";
import { signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider } from "firebase/auth";

export default {
  name: "Login",
  inject: ["auth", "githubProvider"],
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
    };
  },
  created() {
    this.$emit("update:layout", DefaultLayout);
  },
  methods: {
    login(event) {
      event.preventDefault();
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          this.loginError = false;
          const user = userCredential.user;
          console.log("Successfully registered");
          console.log(user);
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
          this.loginError = true;
        });
    },
    signInWithGithub() {
      signInWithPopup(this.auth, this.githubProvider)
        .then((result) => {
          this.loginError = false;
          const user = result.user;
          console.log("Successfully registered");
          console.log(user);
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/");
          }
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
        });
    }
  },
  computed: {
    redirectParams() {
      if (this.$route.query.redirect) {
        return {
          redirect: this.$route.query.redirect,
        };
      }
      return {};
    },
  },
};
</script>

<template>
  <div
    class="
      min-h-full
      flex
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link
            :to="{ name: 'registration', params: redirectParams }"
            class="font-medium text-red-600 hover:text-red-500"
          >
            register for a new account
          </router-link>
        </p>
      </div>
      <form @submit="login" class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-red-500
                focus:border-red-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-b-md
                focus:outline-none
                focus:ring-red-500
                focus:border-red-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Password"
            />
          </div>
        </div>
        <p v-if="loginError" class="text-red-500 text-xs italic">Invalid credentials</p>
        <div class="space-y-4">
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-red-600
              hover:bg-red-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-red-500
            "
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg
                class="h-5 w-5 text-red-500 group-hover:text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
          <button
            @click="signInWithGithub"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border-2 border-black
              text-sm
              font-medium
              rounded-md
              text-black
              bg-white
              hover:text-white
              hover:bg-black
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-black
            "
          >
            Sign in with GitHub
          </button>
        </div>
      </form>
    </div>
  </div>
</template>