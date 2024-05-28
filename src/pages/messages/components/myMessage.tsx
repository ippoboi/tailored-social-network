interface MyMessageProps {
  content: string;
  date: string;
}

export default function MyMessage(props: MyMessageProps) {
  return (
    <div className="w-full flex items-end flex-col gap-2">
      <div className="bg-subTitle/70 rounded-lg rounded-br-sm p-5 max-w-96">
        <p>{props.content}</p>
      </div>
      <div className="text-subTitle text-sm px-2">{props.date}</div>
    </div>
  );
}
