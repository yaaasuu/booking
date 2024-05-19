import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: 800, height: 750 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://www.ghibli.jp/gallery/laputa015.jpg',
    title: 'Bread',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://www.ghibli.jp/images/thumb-arietty1.jpg',
    title: 'arrietty',
  },
  {
    img: 'https://www.ghibli.jp/gallery/thumb-baron039.png',
    title: 'Wall',
  },
  {
    img: 'https://www.ghibli.jp/gallery/chihiro011.jpg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://www.ghibli.jp/images/thumb-howl1.jpg',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://www.ghibli.jp/gallery/thumb-howl016.png',
    title: 'Breakfast',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://www.ghibli.jp/gallery/majo032.jpg',
    title: 'Pie',
  },
  {
    img: 'https://www.ghibli.jp/gallery/marnie005.jpg',
    title: 'Room',
  },
  {
    img: 'https://www.ghibli.jp/images/thumb-marnie1.jpg',
    title: 'mannie',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://www.ghibli.jp/gallery/thumb-porco026.png',
    title: 'Red',
  },
  {
    img: 'https://www.ghibli.jp/images/thumb-red1.jpg',
    title: 'Sea',
  },
  {
    img: 'https://www.ghibli.jp/gallery/thumb-ponyo035.png',
    title: 'Noodle',
    cols: 2,
  },
];