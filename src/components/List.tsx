import { INote } from "../interfaces/INote";
import Note from "./Note";

export default function List(props: any) {
  return (
    <div className="p-2 w-full flex justify-center items-start gap-4 flex-wrap">
      {props.notas.map((note: INote) => (
        <Note
          key={note.id}
          title={note.title}
          text={note.text}
          color={note.color}
          onDelete={() => props.onDeleteNote(note.id)}
        />
      ))}
    </div>
  );
}
