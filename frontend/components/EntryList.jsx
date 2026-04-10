import EntryItem from "./EntryItem";

export default function EntryList({ entries }) {
  if (!entries.length) return <p>No entries yet.</p>;

  return (
    <div>
      {entries.map(entry => (
        <EntryItem key={entry._id} entry={entry} />
      ))}
    </div>
  );
}