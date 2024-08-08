// Profile.js
import React, { useState } from 'react';
import EditProfile from './EditProfile'; // تأكد من صحة المسار
import ViewProfile from './ProfileView'; // تأكد من صحة المسار

const Profile = () => {
  const [view, setView] = useState('view'); // الوضع الافتراضي هو عرض الملف الشخصي

  const handleEditClick = () => {
    setView('edit');
  };

  const handleViewClick = () => {
    setView('view');
  };

  return (
    <div>
      <div>
        <button onClick={handleViewClick}>عرض الملف الشخصي</button>
        <button onClick={handleEditClick}>تحرير الملف الشخصي</button>
      </div>

      {view === 'view' && <ViewProfile />}
      {view === 'edit' && <EditProfile />}
    </div>
  );
};

export default Profile;
