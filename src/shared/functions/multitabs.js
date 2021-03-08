export const closeMultiTabListener = () => {
  window.session = Math.random().toString();
  localStorage.setItem('session', window.session);
  const onStorage = (e) => {
    if (e.key === 'session' && e.newValue !== window.session) {
      localStorage.setItem('multitab', window.session);
    }
    if (e.key === 'multitab' && e.newValue && e.newValue !== window.session) {
      window.removeEventListener('storage', onStorage);
      localStorage.setItem('session', localStorage.getItem('multitab'));
      localStorage.removeItem('multitab');
      window.close();
    }
  };
  window.addEventListener('storage', onStorage);
};
