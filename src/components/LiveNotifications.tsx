import { useState, useEffect } from "react";

interface Notification {
  id: number;
  name: string;
  location: string;
  prize: string;
  timestamp: Date;
}

const sampleNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [
  { name: "Rahul", location: "Delhi", prize: "₹1,000 Bonus" },
  { name: "Priya", location: "Mumbai", prize: "₹500 Credits" },
  { name: "Amit", location: "Bangalore", prize: "25 Free Spins" },
  { name: "Sneha", location: "Pune", prize: "₹200 Voucher" },
  { name: "Vikram", location: "Chennai", prize: "₹5,000 Jackpot" },
  { name: "Anita", location: "Hyderabad", prize: "₹300 Paytm" },
  { name: "Rohan", location: "Kolkata", prize: "Free Tournament" },
  { name: "Kavya", location: "Ahmedabad", prize: "Mystery Reward" },
];

export const LiveNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibleNotification, setVisibleNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const addNotification = () => {
      const randomNotification = sampleNotifications[
        Math.floor(Math.random() * sampleNotifications.length)
      ];
      
      const newNotification: Notification = {
        ...randomNotification,
        id: Date.now(),
        timestamp: new Date(),
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setVisibleNotification(newNotification);

      // Hide notification after 4 seconds
      setTimeout(() => {
        setVisibleNotification(null);
      }, 4000);
    };

    // Add first notification immediately
    addNotification();

    // Then add new notifications every 8-15 seconds
    const interval = setInterval(() => {
      addNotification();
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Live Notification Popup */}
      {visibleNotification && (
        <div className="fixed bottom-6 left-6 z-40 animate-float-up">
          <div className="bg-card/90 backdrop-blur-sm border border-primary/50 rounded-lg p-4 casino-shadow max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-casino-green rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  🎉 <span className="text-primary">{visibleNotification.name}</span> from{" "}
                  <span className="text-accent">{visibleNotification.location}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  just unlocked <span className="text-casino-green font-semibold">
                    {visibleNotification.prize}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Winners Sidebar */}
      <div className="fixed top-1/2 left-6 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="bg-card/20 backdrop-blur-sm border border-border/50 rounded-lg p-4 w-64">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-casino-green rounded-full animate-pulse"></div>
            <h3 className="text-sm font-semibold text-foreground">Recent Winners</h3>
          </div>
          
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="text-xs">
                <div className="flex justify-between items-start">
                  <span className="text-primary font-medium">{notification.name}</span>
                  <span className="text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {notification.location} • {notification.prize}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};