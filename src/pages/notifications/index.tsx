import { useAuth } from "@/context/AuthContext";
import Follow from "@/pages/notifications/components/follow";
import Like from "@/pages/notifications/components/like";
import Reply from "@/pages/notifications/components/reply";
import { gql, useSubscription } from "@apollo/client";

function NotificationsPage() {
  const { user } = useAuth();

  //   const NEW_NOTIFICATION = gql`
  //   subscription OnNotificationAdded {
  //     newNotification(userId: ID = ${JSON.stringify(user._id)}) {
  //       id
  //       type
  //       message
  //       createdAt
  //     }
  //   }
  // `;

  // const { data, loading } = useSubscription(NEW_NOTIFICATION);

  // console.log(data);

  return (
    <div className="w-full flex justify-center">
      <div className="space-y-5 w-4/6">
        <div>Notifications</div>
        <Like />
        <Follow />
        <Follow />
        <Like />
        <Reply />
      </div>
    </div>
  );
}

export default NotificationsPage;
