const getStorageInfo = () => {
  return navigator.storage.estimate().then(({ quota, usage }) => {
    let totalStorage = quota / 1024 / 1024 / 1024;
    let totalUsage = usage / 1024 / 1024 / 1024;
    return { totalStorage, totalUsage};
  });
};

export default getStorageInfo;
