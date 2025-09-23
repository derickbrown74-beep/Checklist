import { useState, useEffect } from 'react';
import TaskChecklist from './TaskChecklist';
import { StyleSettings } from '../types';

interface Profile {
  id: string;
  name: string;
  tasks: Array<{
    id: number;
    text: string;
    completed: boolean;
  }>;
}

interface ProfileTabsProps {
  styles: StyleSettings;
}

export default function ProfileTabs({ styles }: ProfileTabsProps) {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const savedProfiles = localStorage.getItem('profiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [{
      id: 'default',
      name: 'Default List',
      tasks: []
    }];
  });
  
  const [activeProfile, setActiveProfile] = useState<string>(() => {
    const lastActive = localStorage.getItem('activeProfile');
    return lastActive || 'default';
  });

  const [newProfileName, setNewProfileName] = useState('');
  const [isAddingProfile, setIsAddingProfile] = useState(false);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('activeProfile', activeProfile);
  }, [activeProfile]);

  const addProfile = () => {
    if (newProfileName.trim()) {
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: newProfileName.trim(),
        tasks: []
      };
      setProfiles([...profiles, newProfile]);
      setActiveProfile(newProfile.id);
      setNewProfileName('');
      setIsAddingProfile(false);
    }
  };

  const deleteProfile = (id: string) => {
    if (profiles.length > 1) {
      const newProfiles = profiles.filter(profile => profile.id !== id);
      setProfiles(newProfiles);
      if (activeProfile === id) {
        setActiveProfile(newProfiles[0].id);
      }
    }
  };

  const updateTasks = (profileId: string, tasks: any[]) => {
    setProfiles(profiles.map(profile =>
      profile.id === profileId ? { ...profile, tasks } : profile
    ));
  };

  const activeProfileData = profiles.find(p => p.id === activeProfile) || profiles[0];

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg ${
            isEditing
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          title={isEditing ? "Done Editing" : "Edit Lists"}
        >
          {isEditing ? "Done" : "Edit Lists"}
        </button>
        {profiles.map(profile => (
          <div
            key={profile.id}
            className="relative flex items-center"
          >
            <button
              onClick={() => setActiveProfile(profile.id)}
              className={`px-4 py-2 rounded-lg ${
                activeProfile === profile.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } ${isEditing ? 'pr-8' : ''}`}
            >
              {profile.name}
            </button>
            {isEditing && profiles.length > 1 && (
              <button
                onClick={() => deleteProfile(profile.id)}
                className="absolute right-2 text-red-500 hover:text-red-700"
                title="Delete Profile"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {!isAddingProfile ? (
          <button
            onClick={() => setIsAddingProfile(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            + New Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Profile name"
              className="px-3 py-2 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && addProfile()}
            />
            <button
              onClick={addProfile}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingProfile(false);
                setNewProfileName('');
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <TaskChecklist
        key={activeProfile}
        styles={styles}
        tasks={activeProfileData.tasks}
        onTasksChange={(tasks) => updateTasks(activeProfile, tasks)}
      />
    </div>
  );
}