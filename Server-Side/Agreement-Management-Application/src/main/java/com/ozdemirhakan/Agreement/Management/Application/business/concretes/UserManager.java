package com.ozdemirhakan.Agreement.Management.Application.business.concretes;

import com.ozdemirhakan.Agreement.Management.Application.business.abstracts.UserService;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.DataResult;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.Result;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.SuccessDataResult;
import com.ozdemirhakan.Agreement.Management.Application.core.utilities.results.SuccessResult;
import com.ozdemirhakan.Agreement.Management.Application.dataAccess.abstracts.UserDao;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.Agreement;
import com.ozdemirhakan.Agreement.Management.Application.entities.concretes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManager implements UserService {

    private UserDao userDao;



    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserManager(UserDao userDao) {
        super();
        this.userDao = userDao;
    }


    @Override
    public Result addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        this.userDao.save(user);
        return new SuccessResult("Kullanıcı eklendi"+user);
    }

    @Override
    public DataResult<List<User>> getAll() {
        return  new SuccessDataResult<List<User>>
                (this.userDao.findAll(),"Data listelendi");
    }

    @Override
    public DataResult<User> getById(Long id) {
        return new SuccessDataResult<User>
                (this.userDao.findById(id).get(),"Data listelendi");
    }

    @Override
    public Result updateUser(User user) {
        this.userDao.save(user);
        return new SuccessResult("Kullanıcı güncellendi");
    }

    @Override
    public Result numberOfUsers() {
        long number = this.userDao.count();
        return new SuccessResult("Kullanıcı sayısı = "+number);
    }

    @Override
    public Result SaveUser(User user) {
        this.userDao.save(user);
        return new SuccessResult("Kullanıcı güncellendi");
    }

    @Override
    public Result DeleteUserByID(long user_id) {
        this.userDao.deleteById(user_id);
        return new SuccessResult("Kullanıcı Silindi");
    }

    @Override
    public Result DeleteUserByName(User user) {
        this.userDao.delete(user);
        return new SuccessResult("Kullanıcı Silindi.");
    }

    @Override
    public User findByUsername(String username) {
        return  userDao.findByUsername(username).orElse(null);
    }


    @Override
    public DataResult<User> findByEmail(String email) {
        return new SuccessDataResult<User>(this.userDao.findByEmail(email)
                ,"Kullanıcı bulundu");
    }


    @Override
    public DataResult<User> getUserByUserName(String username) {
        return new SuccessDataResult<User>
                (this.userDao.getUserByUsername(username),"Data listelendi");
    }
}
