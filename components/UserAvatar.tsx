import { User } from 'next-auth';
import Image from 'next/image';
import { User as UserIcon } from 'lucide-react';
import { AvatarProps } from '@radix-ui/react-avatar';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image'>;
}

function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user?.image ? (
        <div className='realtive'>
          <Image
            fill
            src={user.image}
            alt='user-profile'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name?.charAt(0)}</span>
          <UserIcon className='w-4 h-4' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default UserAvatar;
