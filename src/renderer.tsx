import { Fragment, type PropsWithChildren } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";
import type { JSX } from "hono/jsx/jsx-runtime";
import type { Manifest } from "vite";

export const renderer = jsxRenderer(({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <title>Hono Template</title>
        <AssetImports src="/src/client.tsx" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
});

/**
 * Helper component that reads the Vite manifest and returns the import tags for
 * the JS/CSS assets processed by Vite.
 * Setting `build.manifest` to `true` in the Vite config is required for this.
 * Borrowed from Honox's excellent link component:
 * https://github.com/honojs/honox/blob/main/src/server/components/link.tsx
 */
export function AssetImports({ src }: { src: string }) {
  if (import.meta.env.DEV) {
    return <script key={src} type="module" src={src} />;
  }

  const rootManifest = import.meta.glob<{ default: Manifest }>(
    "/public/.vite/manifest.json",
    { eager: true },
  );

  const [{ default: manifest }] = Object.values(rootManifest);

  const importTags = Object.entries(manifest).reduce<JSX.Element[]>(
    (tags, [key, { file, css }]) => {
      const isMatchingSrc = key === src.replace(/^\//, "");

      if (isMatchingSrc) {
        const linkTags =
          css?.map((cssPath) => (
            <link key={cssPath} rel="stylesheet" href={cssPath} />
          )) || [];

        return tags.concat(
          <script key={file} type="module" src={file} />,
          linkTags,
        );
      }

      return tags;
    },
    [],
  );

  return <Fragment>{importTags}</Fragment>;
}
