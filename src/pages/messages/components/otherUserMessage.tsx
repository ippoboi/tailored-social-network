interface OtherUserMessageProps {
  content: string;
  date: string;
}

export default function OtherUserMessage(props: OtherUserMessageProps) {
  return (
    <div className="w-full flex items-start flex-col gap-2">
      <div className="bg-subtileText/70 rounded-lg rounded-bl-sm p-5 max-w-96">
        <p>
          This is a big message to test the caracters max length and how it will
          look like when it&apos;s too long.
        </p>
      </div>
      <div className="text-subTitle text-sm px-2">23 May 2023 4:00 AM</div>
    </div>
  );
}
