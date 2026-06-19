import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Adicionar domínios reais de imagens quando disponível, ex.:
      // { protocol: "https", hostname: "cdn.vitriniprime.com.br" },
    ],
  },
};

export default nextConfig;
