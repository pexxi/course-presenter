// Component Update (src/components/UserCard.jsx)
const UserCard = ({ user }) => (
    <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <StatusBadge status={user.status} />
    </div>
);

const StatusBadge = ({ status }) => (
    <span className={`status-badge status-${status}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
); 