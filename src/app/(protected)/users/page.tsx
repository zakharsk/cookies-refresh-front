import { getUsers } from '@/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Login</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users
          ? users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.login}</TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
}
