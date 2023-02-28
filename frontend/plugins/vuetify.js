import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import * as labs from "vuetify/labs/components";
import { VDataTable } from "vuetify/labs/VDataTable";

import ru from "vuetify/lib/locale/ru";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    lang: {
      locales: { ru },
      current: "ru",
    },
    ssr: true,
    theme: {
      defaultTheme: "dark",
    },
    components: { ...components, VDataTable },
    directives,
    // ...labs,
  });

  nuxtApp.vueApp.use(vuetify);
});
