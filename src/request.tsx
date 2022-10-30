import React from 'react';

export const request: any = async () => {
  const url = `https://randomuser.me/api/?results=10`;
  const req = await fetch(url);
  // console.log(req);
  return req;
}