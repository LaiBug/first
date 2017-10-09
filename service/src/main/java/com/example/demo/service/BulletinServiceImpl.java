package com.example.demo.service;

import com.example.demo.BulletinDao;
import com.example.demo.UserDao;
import com.example.demo.pojo.Bulletin;
import com.example.demo.util.MyException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.File;

/**
 * Created by Administrator on 2017/4/24.
 */
@Service
public class BulletinServiceImpl implements BulletinService {

    @Autowired
    private BulletinDao bulletinDao;

    @Autowired
    private UserDao userDao;

    @Override
    public Page<Bulletin> find(String keyWord, PageRequest pageRequest) {
        if(keyWord.equals("-1")){
            Page<Bulletin> li= bulletinDao.findAll(pageRequest);
            for(int i=0;i<li.getContent().size();i++){
                li.getContent().get(i).setUser(userDao.findOne(li.getContent().get(i).getUid()));
            }
            return li;
        }else{
            Page<Bulletin> li= bulletinDao.findByTitleLike(keyWord,pageRequest);
            for(int i=0;i<li.getContent().size();i++){
                li.getContent().get(i).setUser(userDao.findOne(li.getContent().get(i).getUid()));
            }
            return li;
        }
    }
    @Override
    public Bulletin findOne(String id) {
        Bulletin b= bulletinDao.findOne(id);
        b.setUser(userDao.findOne(b.getUid()));
       return  b;
    }
    @Override
    public void edit(Bulletin bulletin) throws MyException {

        Bulletin c1=bulletinDao.findOne(bulletin.getId());
        if(bulletin.getPics().equals("-1")){
            bulletin.setPics(c1.getPics());
        }else{

            String filePath=System.getProperty("user.dir")+"/target/classes/static/pics/bulletin";
            String filePath1="C:/Users/Administrator/Desktop/BOMAMO2/src/main/resources/static/pics/bulletin";
            File folder = new File(filePath+"/"+c1.getPics());
            File folder1 = new File(filePath1+"/"+c1.getPics());
            folder.delete();
            folder1.delete();
        }

        bulletin.setAddDate(c1.getAddDate());
        bulletinDao.save(bulletin);
    }
    @Override
    public void add(Bulletin bulletin) {

        bulletinDao.save(bulletin);
    }
    @Override
    public void del(String id){
        Bulletin c1=bulletinDao.findOne(id);
        String filePath=System.getProperty("user.dir")+"/target/classes/static/pics/bulletin";
        String filePath1="C:/Users/Administrator/Desktop/BOMAMO2/src/main/resources/static/pics/bulletin";
        File folder = new File(filePath+"/"+c1.getPics());
        File folder1 = new File(filePath1+"/"+c1.getPics());
        folder.delete();
        folder1.delete();
        bulletinDao.delete(id);
    }
}
