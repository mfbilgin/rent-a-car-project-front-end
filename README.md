###### ~TR~
# Araba Kiralama Projesi | Front-End
**[Angular](https://angular.io/cli) ve [Bootstrap v5.0](https://getbootstrap.com/docs/5.0/getting-started/introduction/) Kullanılarak Hazırlanmıştır**
## İlgili Klasörler
- [Component](https://github.com/mfbilgin42/kamp-final-project-front-end/tree/main/src/app/component) : HTML, Typescript ve Css dosyalarını içerir. Typescript dosyaları genel olarak ilgili componentin servisini kullanılır.
- [Services](https://github.com/mfbilgin42/kamp-final-project-front-end/tree/main/src/app/services) : API ile bağlantının sağlandığı kısımdır gerekli metotlar serviste yazıldıktan sonra  [Component](https://github.com/mfbilgin42/kamp-final-project-front-end/tree/main/src/app/component) tarafında kullanıma alınarak(Implementation) karmaşa önlenmiş olur.
- [Models](https://github.com/mfbilgin42/kamp-final-project-front-end/tree/main/src/app/models) : API'dan gelen veriler Front-End'de bir interface içerisinde özellik olarak tutulur ve [Component](https://github.com/mfbilgin42/kamp-final-project-front-end/tree/main/src/app/component) tarafında kullanıcıya gösterilir.
- [Pipes](https://github.com/mfbilgin42/kamp-final-project-front-end/tree/main/src/app/pipes) : Eğer elimizde bir veri varsa ve bu veriyi farklı şekilde kullanmak istiyorsak pipe'lar kullanılabilir (Örneğin: Bir fiyat verisi varsa ve o fiyata KDV eklenecek ise pipe kullanılabilir.)
