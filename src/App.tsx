import getVideoId from "get-video-id";
import { useCallback, useState } from "react";
import styles from "./App.module.css";

const getEmbed = (link: string) => {
  const videoId = getVideoId(link).id;
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

function App() {
  const [input, setInput] = useState<string>(() => {
    return JSON.parse(window.localStorage.getItem("input") || '""');
  });
  const [links, setLinks] = useState<string[]>([]);
  const processLinks = useCallback(() => {
    const links = input.split("\n");
    window.localStorage.setItem("input", JSON.stringify(input));
    setLinks(links);
  }, [input]);

  return (
    <>
      <main className={styles["container"]}>
        <aside className={styles["input"]}>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Paste your links. One link per line."
            className={styles["textarea"]}
          />
          <button
            onClick={processLinks}
            className={styles["preview-button"]}
            type="button"
          >
            Preview
          </button>
        </aside>
        <article className={styles["previews"]}>
          {links.map((link, index) => (
            <div key={index} className={styles["preview"]}>
              <p>{link}</p>
              {getEmbed(link)}
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export default App;
