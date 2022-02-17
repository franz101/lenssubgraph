import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  LensHub,
  Followed,
  PostCreated,
  ProfileCreated,
  ProfileCreatorWhitelisted,
  FollowModuleWhitelisted,
  ReferenceModuleWhitelisted,
  CollectModuleWhitelisted,
  DispatcherSet,
  ProfileImageURISet,
  FollowNFTURISet,
  FollowModuleSet,
  CommentCreated,
  MirrorCreated
} from "../generated/LensHub/LensHub"
import { Comment, Post, Profile, SocialGraph, ProfileCreatorWhitelist, CollectModuleWhitelist, FollowModuleWhitelist, ReferenceModuleWhitelist, Mirror } from "../generated/schema"

export function handleProfileCreated(event: ProfileCreated): void {

  let lensContract = LensHub.bind(event.address);
  let entity = Profile.load(event.params.profileId.toString());

  if (!entity) {
    entity = new Profile(event.params.profileId.toString());
    let profileData = lensContract.getProfile(event.params.profileId);

    entity.profileId = event.params.profileId;
    entity.creator = event.params.creator;
    entity.owner = event.params.to;
    entity.pubCount = profileData.pubCount;
    entity.followModule = profileData.followModule;
    entity.followNFT = profileData.followNFT;
    entity.handle = profileData.handle.toString();
    entity.imageURI = profileData.imageURI.toString();
    entity.createdOn = event.params.timestamp;
    entity.followNFTURI = profileData.followNFTURI.toString();
    entity.followModuleReturnData = event.params.followModuleReturnData;
    entity.dispatcher = new Bytes(0x0000000000000000000000000000000000000000);
    entity.save();
  }

};

export function handleCommentCreated(event: CommentCreated): void {

  let entity = Comment.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new Comment(event.transaction.hash.toString());

    entity.profileId = event.params.profileId;
    entity.pubId = event.params.pubId;
    entity.contentURI = event.params.contentURI.toString();
    entity.profileIdPointed = event.params.profileIdPointed;
    entity.pubIdPointed = event.params.pubIdPointed;
    entity.collectModule = event.params.collectModule;
    entity.collectModuleReturnData = event.params.collectModuleReturnData;
    entity.referenceModule = event.params.referenceModule;
    entity.referenceModuleReturnData = event.params.referenceModuleReturnData;
    entity.timestamp = event.params.timestamp;
    entity.save();
  }

};

export function handleMirrorCreated(event: MirrorCreated): void {

  let entity = Mirror.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new Mirror(event.transaction.hash.toString());

    entity.profileId = event.params.profileId;
    entity.pubId = event.params.pubId;
    entity.profileIdPointed = event.params.profileIdPointed;
    entity.pubIdPointed = event.params.pubIdPointed;
    entity.referenceModule = event.params.referenceModule;
    entity.referenceModuleReturnData = event.params.referenceModuleReturnData;
    entity.timestamp = event.params.timestamp;
    entity.save();
  }

};

export function handleFollowed(event: Followed): void {

  let entity = SocialGraph.load(event.params.follower.toHexString());

  if (!entity) {
    let entity = new SocialGraph(event.params.follower.toHexString());
    let newFollowingList: string[] = [];
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }

    entity.following = newFollowingList;
    entity.save();
  }
  else {
    let newFollowingList: string[] = entity.following;
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }
    entity.following = newFollowingList;
    entity.save();
  };

};

export function handlePostCreated(event: PostCreated): void {

  let entity = Post.load(event.transaction.hash.toHexString());

  if (!entity) {
    let entity = new Post(event.transaction.hash.toHexString());

    entity.pubId = event.params.pubId;
    entity.profileId = event.params.profileId.toString();
    entity.contentURI = event.params.contentURI;
    entity.collectModule = event.params.collectModule;
    entity.collectModuleReturnData = event.params.collectModuleReturnData;
    entity.referenceModule = event.params.referenceModule;
    entity.referenceModuleReturnData = event.params.referenceModuleReturnData;
    entity.timestamp = event.params.timestamp;

    entity.save();
  }

};

export function handleProfileCreatorWhitelisted(event: ProfileCreatorWhitelisted): void {

  let entity = ProfileCreatorWhitelist.load(event.params.profileCreator.toHexString());

  if (!entity) {
    let entity = new ProfileCreatorWhitelist(event.params.profileCreator.toHexString());
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }
  else {
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }

};

export function handleFollowModuleWhitelisted(event: FollowModuleWhitelisted): void {

  let entity = FollowModuleWhitelist.load(event.params.followModule.toHexString());

  if (!entity) {
    let entity = new FollowModuleWhitelist(event.params.followModule.toHexString());
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }
  else {
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }

};

export function handleReferenceModuleWhitelisted(event: ReferenceModuleWhitelisted): void {

  let entity = ReferenceModuleWhitelist.load(event.params.referenceModule.toHexString());

  if (!entity) {
    let entity = new ReferenceModuleWhitelist(event.params.referenceModule.toHexString());
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }
  else {
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }

};

export function handleCollectModuleWhitelisted(event: CollectModuleWhitelisted): void {

  let entity = CollectModuleWhitelist.load(event.params.collectModule.toHexString());

  if (!entity) {
    let entity = new CollectModuleWhitelist(event.params.collectModule.toHexString());
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }
  else {
    entity.isWhitelisted = event.params.whitelisted;
    entity.lastUpdated = event.params.timestamp;
    entity.save();
  }

};

export function handleDispatcherSet(event: DispatcherSet): void {

  let entity = Profile.load(event.params.profileId.toString());

  if (entity) {
    entity.dispatcher = event.params.dispatcher;
    entity.save();
  }

};

export function handleProfileImageURISet(event: ProfileImageURISet): void {

  let entity = Profile.load(event.params.profileId.toString());

  if (entity) {
    entity.imageURI = event.params.imageURI;
    entity.save();
  }

};

export function handleFollowNFTURISet(event: FollowNFTURISet): void {

  let entity = Profile.load(event.params.profileId.toString());

  if (entity) {
    entity.followNFTURI = event.params.followNFTURI;
    entity.save();
  }

};

export function handleFollowModuleSet(event: FollowModuleSet): void {

  let entity = Profile.load(event.params.profileId.toString());

  if (entity) {
    entity.followModule = event.params.followModule;
    entity.followModuleReturnData = event.params.followModuleReturnData;
    entity.save();
  }

};
