export function HeaderToolbar() {
  return (
    <div className="flex h-12 items-center justify-center border-b border-gray-500 bg-white px-2 shadow-sm">
      <div className="flex-1 text-left">Back | Title</div>
      <div className="flex-1 text-center">ProfPic | Undo | Redo | Settings</div>
      <div className="flex-1 text-right">
        Icons | Preview | Files | Commit | Publish
      </div>
    </div>
  );
}
