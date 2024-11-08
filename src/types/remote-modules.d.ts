declare module 'musicPlayer/App' {
    import { FC } from 'react';
  
    interface MusicLibraryProps {
      userRole?: 'admin' | 'user';
      userId?: string;
    }
  
    const MusicLibrary: FC<MusicLibraryProps>;
    export default MusicLibrary;
  }