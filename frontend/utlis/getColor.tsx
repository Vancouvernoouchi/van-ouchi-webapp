/**
 * ステータスに応じた色を返す関数
 * カードと詳細ページで使用予定
 *
 * @param status {string}
 * @return { { statusBgColor: string, statusTextColor: string } }
 */
export const getStatusColor = (
  status: string
): { statusBgColor: string; statusTextColor: string } => {
  let statusBgColor = "white";
  let statusTextColor = "black";

  if (status === "入居中" || status === "成約済み" || status === "休止中") {
    statusBgColor = "slate-200";
    statusTextColor = "black";
  } else if (status === "即入居可能") {
    statusBgColor = "red-500";
    statusTextColor = "white";
  } else if (status === "入居者募集中") {
    statusBgColor = "yellow-500";
    statusTextColor = "white";
  }

  return { statusBgColor, statusTextColor };
};
