# React + Vite

## Video gallery

Import `VideoGallery` into any page and supply your video files:

```jsx
import VideoGallery from '../components/VideoGallery'

<VideoGallery videos={[
  {
    id: 'getaway',
    src: '/videos/getaway.mp4',
    title: 'A day outdoors',
    description: 'A glimpse of your next getaway.',
    poster: '/videos/getaway.jpg',
    duration: '0:45',
    captions: [
      { src: '/videos/getaway.en.vtt', srcLang: 'en', label: 'English', default: true },
    ],
  },
]} />
```

Place these assets in `public/videos/`, or use hosted media URLs. Each video
needs a unique `id`, `src`, and `title`; other fields are optional. `duration` is
a display label. You can also override `eyebrow`, `title`, and `description` on
the gallery. Videos load on demand and playback uses native browser controls.
The component shows an empty state until videos are supplied.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
