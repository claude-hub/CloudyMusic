using Newtonsoft.Json;
using System;
using System.Text;

namespace Service.Extension
{
    public static class ExtensionMethods
    {
        public static  string GetJson(this String auth)
        {
            var auths = auth.Split('.');
            byte[] bytes = Jose.Base64Url.Decode(auths[1]);

            Console.WriteLine(bytes.Length);
            var json = Encoding.UTF8.GetString(bytes);
            return json;
        }
        public static UserInfoModel GetEmployeeUserObject(string auth)
        {
            var userJson = GetJson(auth);
            return JsonStringToObj<UserInfoModel>(userJson);
        }
        private static ObjType JsonStringToObj<ObjType>(string JsonString) where ObjType : class
        {
            return  JsonConvert.DeserializeObject<ObjType>(JsonString);
        }
    }
}
