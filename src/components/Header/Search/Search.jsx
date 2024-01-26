import styles from "./Search.module.scss";

export default function Search() {
  return (
    <>
      <form className={styles.form_search}>
        <div className={styles.search}>
          <input
            type="search"
            id="default-search"
            placeholder="Поиск..."
            required
          />
          <div className={styles.search_svg}>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </form>
    </>
  );
}
