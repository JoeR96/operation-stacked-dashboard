import create from 'zustand';

const useThemeStore = create((set) => ({
    colors: {
        primary: '#FF6000',
        secondary: '#FFA559',
        background: '#454545',
        text: '#FFFFFF',
        accent: '#FFE6C7',
    },
}));

export default useThemeStore;
