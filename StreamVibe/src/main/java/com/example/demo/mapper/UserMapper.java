package com.example.demo.mapper;

import org.mapstruct.Mapper;
// import org.mapstruct.MapperTarget;
import org.springframework.stereotype.Component;

import com.example.demo.FormController.UserFormRequest;
import com.example.demo.User;

@Component
public class UserMapper {
    public User toUserFromUserFormRequest(UserFormRequest request){
        User user = new User();
        user.setName(request.name());
        user.setSurname(request.surname());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setCheckbox(request.checkbox());
        user.setMessage(request.message());
        return user;
    }
}
