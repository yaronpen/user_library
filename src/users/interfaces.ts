
export interface IUser {
  name: {
    title: string
    first: string,
    last: string
  },
  email: string,
  location: {
    country: string,
    city: string,
    street: {
      name: string,
      number: number
    }
  },
  picture?: string,
  uuid: string
}