export default function Pagination({
  page,
  previous,
  next,
}: {
  page: number;
  previous: () => void;
  next: () => void;
}): JSX.Element {
  return (
    <>
      <div className="join">
        <button
          disabled={page <= 1 ? true : false}
          onClick={previous}
          className="join-item btn"
        >
          «
        </button>
        <button className="join-item btn">{page}</button>
        <button onClick={next} className="join-item btn">
          »
        </button>
      </div>
    </>
  );
}
