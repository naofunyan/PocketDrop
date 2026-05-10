/// <reference types="vite/client" />

// Teach TypeScript that importing SVG files returns a string URL
declare module '*.svg' {
  const src: string;
  export default src;
}

// Other static asset types (optional, good to have)
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
