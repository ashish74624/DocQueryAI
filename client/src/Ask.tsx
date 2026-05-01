
import Dashboard from './Dashboard';

export default function Ask() {
    return (
        <Dashboard
            onLogout={() => {
                localStorage.removeItem(
                    "token"
                );
            }}
        />
    )
}
