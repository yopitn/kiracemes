describe("featured image", () => {
  test.skip("test regex", () => {
    const str =
      '<p>test dua</p><img src="https://examples-images.com"/><p>Tolong saya</p><img src="test.com" alt="test" title="test"></img>';
    const regex1 = /<\s*?img\s+[^>]*?\s*src\s*=\s*(["'])((\\?.)*?)\1[^>]*?>/gm;
    const regex2 = /src="([^"]+)"/;
    const findImg = str.match(regex1);
    const img = findImg[0];
    const imgSrc = img.match(regex2);

    expect(imgSrc[1]).toBe("https://examples-images.com");
  });
});
