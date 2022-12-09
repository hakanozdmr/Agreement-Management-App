package com.ozdemirhakan.Agreement.Management.Application.business.abstracts;

import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.DataResult;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.Result;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.User;

import java.util.List;

public interface UserService {
    Result addUser(User user);

    DataResult<List<User>> getAll();

    DataResult<User> getById(Long id);
    //Update  Agreement
    Result updateUser(User user);

    //Number of Agreement
    Result numberOfUsers();

    //Create a Agreement
    Result SaveUser(User user);

    //Delete By ID
    Result DeleteUserByID(long user_id);

    //Delete By Name
    Result DeleteUserByName(User User);

    User findByUsername(String username);

    DataResult<User> findByEmail(String email);


    DataResult<User> getUserByUserName(String username);
}
