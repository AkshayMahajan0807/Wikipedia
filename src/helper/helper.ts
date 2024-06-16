export function getYouTubeVideoId(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const getRegularExp = (type: 'YOUTUBE' | 'IMAGE') => {
  switch (type) {
    case 'IMAGE':
      return /https?:\/\/[^ ]+\.(?:jpg|jpeg|png|gif)/g;

    case 'YOUTUBE':
      return /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    default:
      break;
  }
};
