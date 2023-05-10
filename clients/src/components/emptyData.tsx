export default function EmptyData({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
}
