import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../firebase";
import { useEffect } from "react";

const Login = ({ navigation }) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    //To listen for a user
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("DrawerNav", { // To replace the stack which will prevent it from going back.
          screen: "Home",
        });
      }
    });
    return unsubscribe;
  }, []);

  //To Login
  const onSubmit = (data) => {
    console.log(data);

    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((authUser) => {
        console.log("login succesful", data.email, data.password);
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });

    reset(defaultValues);
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#273827" }}>
      <View style={styles.container}>
        <Text style={styles.text}>Sign In</Text>
        <View>
          {/* Email */}
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={"white"}
                style={styles.input}
                inputMode="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor={"white"}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <TouchableOpacity style={styles.forgot2}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginbutton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.logintext}>Log In</Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: "center", color: "white" }}>or</Text>

          <TouchableOpacity style={styles.facebookbutton}>
            <Text style={styles.facebooktext}>Log in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.phone1, { marginTop: 30 }]}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.phone2}>Dont have an Account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#273827",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  text: {
    color: "#4ef57b",
    paddingVertical: 20,
    fontWeight: "700",
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "white",
  },
  forgot: {
    color: "#378dde",
  },
  forgot2: {
    alignItems: "flex-end",
  },
  loginbutton: {
    backgroundColor: "#4ef57b",
    borderRadius: 22,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 30,
  },
  logintext: {
    fontWeight: "700",
    fontSize: 15,
  },
  facebookbutton: {
    backgroundColor: "blue",
    borderRadius: 22,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 30,
  },
  facebooktext: {
    fontWeight: "700",
    color: "white",
    fontSize: 15,
  },
  phone1: {
    alignItems: "center",
  },
  phone2: {
    color: "#378dde",
  },
  error: {
    color: "#ff0000",
    fontSize: 9,
    marginBottom: 8,
    marginLeft: 6,
  },
});
