interface ISMSDataContext {
  setData: (
    category: string,
    date: Date,
    shop: string,
    money: string,
  ) => void;
}
